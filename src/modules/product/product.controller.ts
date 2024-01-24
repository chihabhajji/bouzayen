import { Crud } from '@nestjs-library/crud';
import { ProductEntity } from './product.entity';
import { ProductsService } from './product.service';
import { Controller } from '@nestjs/common';
import { ApiTags, OmitType } from '@nestjs/swagger';

@Crud({
    entity: ProductEntity,
    routes: {
        create: {
            exclude: ['deletedAt', 'updatedAt'],
            swagger: {
                body: OmitType(ProductEntity, ['createdAt', 'updatedAt', 'deletedAt', 'slug']),
                response: OmitType(ProductEntity, ['updatedAt', 'deletedAt']),
            },
        },
    },
})
@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly crudService: ProductsService) {}
}
