import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { CreateSlot } from './dtos/create.dto'
import { SlotQueryDto } from './dtos/query.dto'
import { UpdateSlot } from './dtos/update.dto'
import { SlotEntity } from './entity/slot.entity'

@ApiTags('slots')
@Controller('slots')
export class SlotsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SlotEntity })
  @Post()
  create(@Body() createSlotDto: CreateSlot, @GetUser() user: GetUserType) {
    // checkRowLevelPermission(user, createSlotDto.uid)
    console.log('user', user)
    return this.prisma.slot.create({ data: createSlotDto })
  }

  @ApiOkResponse({ type: [SlotEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: SlotQueryDto) {
    return this.prisma.slot.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: SlotEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.slot.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: SlotEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSlotDto: UpdateSlot,
    @GetUser() user: GetUserType,
  ) {
    console.log('user', user)
    // const slot = await this.prisma.slot.findUnique({ where: { id } })
    // checkRowLevelPermission(user, slot.uid)
    return this.prisma.slot.update({
      where: { id },
      data: updateSlotDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    console.log('user', user)
    // const slot = await this.prisma.slot.findUnique({ where: { id } })
    // checkRowLevelPermission(user, slot.uid)
    return this.prisma.slot.delete({ where: { id } })
  }
}
