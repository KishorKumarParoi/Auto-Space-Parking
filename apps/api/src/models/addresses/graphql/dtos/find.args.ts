import { ArgsType, Field, PartialType, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { AddressOrderByWithRelationInput } from './order-by.args'
import { AddressWhereInput, AddressWhereUniqueInput } from './where.args'

registerEnumType(Prisma.AddressScalarFieldEnum, {
  name: 'AddressScalarFieldEnum',
})

@ArgsType()
class FindManyAddressArgsStrict {
  where: AddressWhereInput
  orderBy: AddressOrderByWithRelationInput[]
  cursor: AddressWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.AddressScalarFieldEnum])
  distinct: Prisma.AddressScalarFieldEnum[]
}

@ArgsType()
export class FindManyAddressArgs extends PartialType(
  FindManyAddressArgsStrict,
) {}

@ArgsType()
export class FindUniqueAddressArgs {
  where: AddressWhereUniqueInput
}
