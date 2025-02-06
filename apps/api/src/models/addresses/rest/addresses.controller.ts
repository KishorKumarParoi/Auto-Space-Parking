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
import { CreateAddress } from './dtos/create.dto'
import { AddressQueryDto } from './dtos/query.dto'
import { UpdateAddress } from './dtos/update.dto'
import { AddressEntity } from './entity/address.entity'

@ApiTags('addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AddressEntity })
  @Post()
  create(
    @Body() createAddressDto: CreateAddress,
    @GetUser() user: GetUserType,
  ) {
    console.log('user', user)
    // checkRowLevelPermission(user, createAddressDto.uid)
    return this.prisma.address.create({ data: createAddressDto })
  }

  @ApiOkResponse({ type: [AddressEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: AddressQueryDto) {
    return this.prisma.address.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: AddressEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.address.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: AddressEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddress,
    @GetUser() user: GetUserType,
  ) {
    console.log('user', user)
    // const address = await this.prisma.address.findUnique({ where: { id } })
    // checkRowLevelPermission(user, address.uid)
    return this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    console.log('user', user)
    // const address = await this.prisma.address.findUnique({ where: { id } })
    // checkRowLevelPermission(user, address.uid)
    return this.prisma.address.delete({ where: { id } })
  }
}
