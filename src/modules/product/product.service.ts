import { CrudService } from '@nestjs-library/crud';
import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService extends CrudService<ProductEntity> {
    constructor(@InjectRepository(ProductEntity) public readonly repository: Repository<ProductEntity>) {
        super(repository);
    }
}
