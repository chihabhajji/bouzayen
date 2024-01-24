import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFeedbackEntity } from './user-feedback.entity';
import { FeedbackService } from './feedback.service';
import { UserFeedbackController } from './feedback.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserFeedbackEntity])],
    providers: [FeedbackService],
    controllers: [UserFeedbackController],
})
export class FeedbackModule {}
