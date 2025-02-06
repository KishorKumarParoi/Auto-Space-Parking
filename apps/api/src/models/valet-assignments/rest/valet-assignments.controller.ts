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
import { checkRowLevelPermission } from 'src/common/auth/util'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { CreateValetAssignment } from './dtos/create.dto'
import { ValetAssignmentQueryDto } from './dtos/query.dto'
import { UpdateValetAssignment } from './dtos/update.dto'
import { ValetAssignmentEntity } from './entity/valet-assignment.entity'

@ApiTags('valet-assignments')
@Controller('valet-assignments')
export class ValetAssignmentsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ValetAssignmentEntity })
  @Post()
  create(
    @Body() createValetAssignmentDto: CreateValetAssignment,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, createValetAssignmentDto.pickupValetId)
    return this.prisma.valetAssignment.create({
      data: createValetAssignmentDto,
    })
  }

  @ApiOkResponse({ type: [ValetAssignmentEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ValetAssignmentQueryDto) {
    return this.prisma.valetAssignment.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ValetAssignmentEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log('id', id)
    // return this.prisma.valetAssignment.findUnique({ where: { uid } })
  }

  @ApiOkResponse({ type: ValetAssignmentEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateValetAssignmentDto: UpdateValetAssignment,
    @GetUser() user: GetUserType,
  ) {
    console.log('updateValetAssignmentDto', updateValetAssignmentDto)
    console.log('user', user)
    // const valetAssignment = await this.prisma.valetAssignment.findUnique({
    // where: { id },
    // })
    // checkRowLevelPermission(user, valetAssignment.uid)
    // return this.prisma.valetAssignment.update({
    // where: { id },
    //   data: updateValetAssignmentDto,
    // })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    console.log('id', id)
    console.log('user', user)
    // const valetAssignment = await this.prisma.valetAssignment.findUnique({
    //   where: { id },
    // })
    // checkRowLevelPermission(user, valetAssignment.uid)
    // return this.prisma.valetAssignment.delete({ where: { id } })
  }
}
