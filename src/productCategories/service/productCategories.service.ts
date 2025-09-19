/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { ProductCategoriesDto } from '../dto/productCategories.dto';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ProductCategories } from '../entity/productCategories.entity';
import { ProductCategoriesRequestDto } from '../dto/productCategoriesRequest.dto';
import { ProductSubcategory } from 'src/productSubcategory/entity/productSubcategory.entity';
import { Products } from 'src/products/entity/products.entity';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @Inject('PRODUCT_CATEGORIES_REPOSITORY')
    private readonly productCategoriesRepository: typeof ProductCategories,
    @Inject('PRODUCT_SUBCATEGORY_REPOSITORY')
    private readonly productSubcategoryRepository: typeof ProductSubcategory,
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productsRepository: typeof Products,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,
  ) {}

  async createProductCategories(requestDto: ProductCategoriesRequestDto) {
    const t = await this.sequelize.transaction();
    try {
      const findProductCategories =
        await this.productCategoriesRepository.findOne({
          where: { name: requestDto.name },
          transaction: t,
        });
      if (findProductCategories) {
        await t.rollback();
        throw this.errorMessageService.GeneralErrorCore(
          'ProductCategories with this Name already exists',
          200,
        );
      }

      // Reference number logic
      const lastProductCategories =
        await this.productCategoriesRepository.findOne({
          order: [['createdAt', 'DESC']],
          transaction: t,
        });
      let nextSeriesNumber = 1;
      if (lastProductCategories?.reference_number) {
        const match = lastProductCategories.reference_number.match(/\d+/);
        if (match) {
          const lastSeriesNumber = parseInt(match[0], 10);
          if (!isNaN(lastSeriesNumber)) {
            nextSeriesNumber = lastSeriesNumber + 1;
          }
        }
      }
      const dateString = moment().format('DDMMYY');
      const newReferenceNumber = `PC${nextSeriesNumber}-${dateString}`;

      // Create the main category
      const categoryFields = {
        name: requestDto.name,
        description: requestDto.description,
        reference_number: newReferenceNumber,
        reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;
      const productCategories = await this.productCategoriesRepository.create(
        categoryFields,
        { transaction: t },
      );

      // Handle nested subcategories and products
      if (requestDto.subcategories && requestDto.subcategories.length > 0) {
        for (const subcategoryDto of requestDto.subcategories) {
          // Generate subcategory reference number
          const lastSubcategory =
            await this.productSubcategoryRepository.findOne({
              order: [['createdAt', 'DESC']],
              transaction: t,
            });
          let nextSubSeriesNumber = 1;
          if (lastSubcategory?.reference_number) {
            const subMatch = lastSubcategory.reference_number.match(/\d+/);
            if (subMatch) {
              nextSubSeriesNumber = parseInt(subMatch[0], 10) + 1;
            }
          }
          const newSubReferenceNumber = `PSC${nextSubSeriesNumber}-${moment().format('DDMMYY')}`;

          // Create the subcategory
          const subcategory = await this.productSubcategoryRepository.create(
            {
              category_id: productCategories.id,
              name: subcategoryDto.name,
              description: subcategoryDto.description,
              reference_number: newSubReferenceNumber,
              reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
              createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            } as any,
            { transaction: t },
          );

          // Handle nested products
          if (subcategoryDto.products && subcategoryDto.products.length > 0) {
            for (const productDto of subcategoryDto.products) {
              // Generate product reference number
              const lastProduct = await this.productsRepository.findOne({
                order: [['createdAt', 'DESC']],
                transaction: t,
              });
              let nextProductSeriesNumber = 1;
              if (lastProduct?.reference_number) {
                const productMatch = lastProduct.reference_number.match(/\d+/);
                if (productMatch) {
                  nextProductSeriesNumber = parseInt(productMatch[0], 10) + 1;
                }
              }
              const newProductReferenceNumber = `PR${nextProductSeriesNumber}-${moment().format('DDMMYY')}`;

              // Create the product
              await this.productsRepository.create(
                {
                  subcategory_id: subcategory.id,
                  name: productDto.name,
                  description: productDto.description,
                  reference_number: newProductReferenceNumber,
                  reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                  createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                  updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                } as any,
                { transaction: t },
              );
            }
          }
        }
      }

      await t.commit();
      const newCategory = await this.productCategoriesRepository.findByPk(
        productCategories.id,
        {
          include: [{ model: ProductSubcategory, include: [Products] }],
        },
      );
      return new ProductCategoriesDto(newCategory);
    } catch (error) {
      await t.rollback();
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async updateProductCategories(
    id: string,
    requestDto: ProductCategoriesRequestDto,
  ) {
    const t = await this.sequelize.transaction();
    try {
      const oldProductCategories =
        await this.productCategoriesRepository.findByPk(id, { transaction: t });
      if (!oldProductCategories) {
        await t.rollback();
        throw this.errorMessageService.GeneralErrorCore(
          'ProductCategories not found',
          404,
        );
      }

      const findProductCategories =
        await this.productCategoriesRepository.findOne({
          where: { name: requestDto.name, id: { [Op.ne]: id } },
          transaction: t,
        });
      if (findProductCategories) {
        await t.rollback();
        throw this.errorMessageService.GeneralErrorCore(
          'ProductCategories with this name already exists',
          200,
        );
      }

      const fields = {
        name: requestDto.name,
        description: requestDto.description,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const [updatedCount] = await this.productCategoriesRepository.update(
        fields,
        {
          where: { id },
          transaction: t,
        },
      );

      if (updatedCount > 0) {
        // If nested data is provided, first delete all old related records.
        if (requestDto.subcategories) {
          // Find all subcategories to get their IDs
          const oldSubcategories =
            await this.productSubcategoryRepository.findAll({
              where: { category_id: id },
              transaction: t,
            });

          // Get all subcategory IDs to delete their products
          const subcategoryIds = oldSubcategories.map((sub) => sub.id);
          if (subcategoryIds.length > 0) {
            await this.productsRepository.destroy({
              where: { subcategory_id: { [Op.in]: subcategoryIds } },
              transaction: t,
            });
          }

          // Delete all subcategories for this category
          await this.productSubcategoryRepository.destroy({
            where: { category_id: id },
            transaction: t,
          });

          // Then create the new nested records
          for (const subcategoryDto of requestDto.subcategories) {
            // Generate subcategory reference number
            const lastSubcategory =
              await this.productSubcategoryRepository.findOne({
                order: [['createdAt', 'DESC']],
                transaction: t,
              });
            let nextSubSeriesNumber = 1;
            if (lastSubcategory?.reference_number) {
              const subMatch = lastSubcategory.reference_number.match(/\d+/);
              if (subMatch) {
                nextSubSeriesNumber = parseInt(subMatch[0], 10) + 1;
              }
            }
            const newSubReferenceNumber = `PSC${nextSubSeriesNumber}-${moment().format('DDMMYY')}`;

            const subcategory = await this.productSubcategoryRepository.create(
              {
                category_id: id,
                name: subcategoryDto.name,
                description: subcategoryDto.description,
                reference_number: newSubReferenceNumber,
                reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              } as any,
              { transaction: t },
            );

            if (subcategoryDto.products && subcategoryDto.products.length > 0) {
              for (const productDto of subcategoryDto.products) {
                // Generate product reference number
                const lastProduct = await this.productsRepository.findOne({
                  order: [['createdAt', 'DESC']],
                  transaction: t,
                });
                let nextProductSeriesNumber = 1;
                if (lastProduct?.reference_number) {
                  const productMatch =
                    lastProduct.reference_number.match(/\d+/);
                  if (productMatch) {
                    nextProductSeriesNumber = parseInt(productMatch[0], 10) + 1;
                  }
                }
                const newProductReferenceNumber = `PR${nextProductSeriesNumber}-${moment().format('DDMMYY')}`;

                await this.productsRepository.create(
                  {
                    subcategory_id: subcategory.id,
                    name: productDto.name,
                    description: productDto.description,
                    reference_number: newProductReferenceNumber,
                    reference_number_date: moment().format(
                      'YYYY-MM-DD HH:mm:ss',
                    ),
                    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                  } as any,
                  { transaction: t },
                );
              }
            }
          }
        }

        await t.commit();
        const updatedCategory = await this.productCategoriesRepository.findByPk(
          id,
          {
            include: [{ model: ProductSubcategory, include: [Products] }],
          },
        );
        return new ProductCategoriesDto(updatedCategory);
      } else {
        await t.rollback();
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to update ProductCategories',
          200,
        );
      }
    } catch (error) {
      await t.rollback();
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getProductCategories(id: string) {
    try {
      const productCategories = await this.productCategoriesRepository.findByPk(
        id,
        {
          include: [{ model: ProductSubcategory, include: [Products] }],
        },
      );
      if (!productCategories) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductCategories not found',
          404,
        );
      }
      return new ProductCategoriesDto(productCategories);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getAllProductCategories() {
    try {
      const productCategories = await this.productCategoriesRepository.findAll({
        include: [{ model: ProductSubcategory, include: [Products] }],
      });
      if (!productCategories || productCategories.length === 0) {
        throw this.errorMessageService.GeneralErrorCore(
          'NO ProductCategories found',
          404,
        );
      }
      return productCategories.map(
        (productCategories) => new ProductCategoriesDto(productCategories),
      );
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deleteProductCategories(id: string) {
    const t = await this.sequelize.transaction();
    try {
      const productCategories = await this.productCategoriesRepository.findByPk(
        id,
        { transaction: t },
      );

      if (!productCategories) {
        await t.rollback();
        throw this.errorMessageService.GeneralErrorCore(
          'ProductCategories not found',
          404,
        );
      }

      // Step 1: Find all subcategories associated with the category
      const subcategories = await this.productSubcategoryRepository.findAll({
        where: { category_id: id },
        transaction: t,
      });

      if (subcategories.length > 0) {
        // Step 2: Get the IDs of all subcategories
        const subcategoryIds = subcategories.map((sub) => sub.id);

        // Step 3: Delete all products belonging to these subcategories
        await this.productsRepository.destroy({
          where: { subcategory_id: { [Op.in]: subcategoryIds } },
          transaction: t,
        });

        // Step 4: Delete all subcategories
        await this.productSubcategoryRepository.destroy({
          where: { category_id: id },
          transaction: t,
        });
      }

      // Step 5: Delete the main category
      const deleted = await this.productCategoriesRepository.destroy({
        where: { id: id },
        transaction: t,
      });

      if (deleted) {
        await t.commit();
        return { message: 'ProductCategories deleted successfully' };
      } else {
        await t.rollback();
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete ProductCategories',
          200,
        );
      }
    } catch (error) {
      await t.rollback();
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
