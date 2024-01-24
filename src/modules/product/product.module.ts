import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    providers: [ProductsService],
    exports: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {}
