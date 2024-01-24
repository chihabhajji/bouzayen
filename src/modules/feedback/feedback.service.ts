import { CrudService } from '@nestjs-library/crud';
import { Injectable } from '@nestjs/common';
import { UserFeedbackEntity } from './user-feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService extends CrudService<UserFeedbackEntity> {
    constructor(@InjectRepository(UserFeedbackEntity) public readonly repository: Repository<UserFeedbackEntity>) {
        super(repository);
    }
}
