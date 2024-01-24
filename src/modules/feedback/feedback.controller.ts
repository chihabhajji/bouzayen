import { Crud } from '@nestjs-library/crud';
import { UserFeedbackEntity } from './user-feedback.entity';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';

@Crud({
    entity: UserFeedbackEntity,
})
@Controller('user-feedback')
@ApiTags('user-feedback')
export class UserFeedbackController {
    constructor(private readonly crudService: FeedbackService) {}
}
