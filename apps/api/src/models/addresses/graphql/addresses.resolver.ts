import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { AddressesService } from './addresses.service'
import { CreateAddressInput } from './dtos/create-address.input'
import { FindManyAddressArgs, FindUniqueAddressArgs } from './dtos/find.args'
import { UpdateAddressInput } from './dtos/update-address.input'
import { Address } from './entity/address.entity'

@Resolver(() => Address)
export class AddressesResolver {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Address)
  createAddress(
    @Args('createAddressInput') args: CreateAddressInput,
    @GetUser() user: GetUserType,
  ) {
    console.log('user', user)
    // checkRowLevelPermission(user, args.id.toString())
    return this.addressesService.create(args)
  }

  @Query(() => [Address], { name: 'addresses' })
  findAll(@Args() args: FindManyAddressArgs) {
    return this.addressesService.findAll(args)
  }

  @Query(() => Address, { name: 'address' })
  findOne(@Args() args: FindUniqueAddressArgs) {
    return this.addressesService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Address)
  async updateAddress(
    @Args('updateAddressInput') args: UpdateAddressInput,
    @GetUser() user: GetUserType,
  ) {
    const address = await this.prisma.address.findUnique({
      where: { id: args.id },
    })
    checkRowLevelPermission(user, address.id.toString())
    return this.addressesService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Address)
  async removeAddress(
    @Args() args: FindUniqueAddressArgs,
    @GetUser() user: GetUserType,
  ) {
    const address = await this.prisma.address.findUnique(args)
    checkRowLevelPermission(user, address.id.toString())
    return this.addressesService.remove(args)
  }
}
