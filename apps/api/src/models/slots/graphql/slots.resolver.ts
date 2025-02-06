import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { CreateSlotInput } from './dtos/create-slot.input'
import { FindManySlotArgs, FindUniqueSlotArgs } from './dtos/find.args'
import { UpdateSlotInput } from './dtos/update-slot.input'
import { Slot } from './entity/slot.entity'
import { SlotsService } from './slots.service'

@Resolver(() => Slot)
export class SlotsResolver {
  constructor(
    private readonly slotsService: SlotsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Slot)
  createSlot(
    @Args('createSlotInput') args: CreateSlotInput,
    @GetUser() user: GetUserType,
  ) {
    console.log('user', user)
    // checkRowLevelPermission(user, args.uid)
    return this.slotsService.create(args)
  }

  @Query(() => [Slot], { name: 'slots' })
  findAll(@Args() args: FindManySlotArgs) {
    return this.slotsService.findAll(args)
  }

  @Query(() => Slot, { name: 'slot' })
  findOne(@Args() args: FindUniqueSlotArgs) {
    return this.slotsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Slot)
  async updateSlot(
    @Args('updateSlotInput') args: UpdateSlotInput,
    @GetUser() user: GetUserType,
  ) {
    console.log('user', user)
    // const slot = await this.prisma.slot.findUnique({ where: { id: args.id } })
    // checkRowLevelPermission(user, slot.uid)
    return this.slotsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Slot)
  async removeSlot(
    @Args() args: FindUniqueSlotArgs,
    @GetUser() user: GetUserType,
  ) {
    console.log('user', user)
    // const slot = await this.prisma.slot.findUnique(args)
    // checkRowLevelPermission(user, slot.uid)
    return this.slotsService.remove(args)
  }
}
