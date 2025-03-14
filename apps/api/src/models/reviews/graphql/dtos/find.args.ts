import { ArgsType, Field, PartialType, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ReviewOrderByWithRelationInput } from './order-by.args'
import { ReviewWhereInput, ReviewWhereUniqueInput } from './where.args'

registerEnumType(Prisma.ReviewScalarFieldEnum, {
  name: 'ReviewScalarFieldEnum',
})

@ArgsType()
class FindManyReviewArgsStrict {
  where: ReviewWhereInput
  orderBy: ReviewOrderByWithRelationInput[]
  cursor: ReviewWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.ReviewScalarFieldEnum])
  distinct: Prisma.ReviewScalarFieldEnum[]
}

@ArgsType()
export class FindManyReviewArgs extends PartialType(FindManyReviewArgsStrict) {}

@ArgsType()
export class FindUniqueReviewArgs {
  where: ReviewWhereUniqueInput
}
