import { InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class CustomerWhereUniqueInput {
  uid: string
}

@InputType()
export class CustomerWhereInputStrict
  implements
    RestrictProperties<CustomerWhereInputStrict, Prisma.CustomerWhereInput>
{
  uid: string | Prisma.StringFilter<'Customer'>
  createdAt: string | Prisma.DateTimeFilter<'Customer'> | Date
  updatedAt: string | Prisma.DateTimeFilter<'Customer'> | Date
  displayName: string | Prisma.StringNullableFilter<'Customer'>
  User:
    | (Prisma.Without<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput> &
        Prisma.UserWhereInput)
    | (Prisma.Without<Prisma.UserWhereInput, Prisma.UserScalarRelationFilter> &
        Prisma.UserScalarRelationFilter)
  Bookings: Prisma.BookingListRelationFilter
  Reviews: Prisma.ReviewListRelationFilter
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: CustomerWhereInput[]
  OR: CustomerWhereInput[]
  NOT: CustomerWhereInput[]
}

@InputType()
export class CustomerWhereInput extends PartialType(CustomerWhereInputStrict) {}

@InputType()
export class CustomerListRelationFilter {
  every?: CustomerWhereInput
  some?: CustomerWhereInput
  none?: CustomerWhereInput
}

@InputType()
export class CustomerRelationFilter {
  is?: CustomerWhereInput
  isNot?: CustomerWhereInput
}
