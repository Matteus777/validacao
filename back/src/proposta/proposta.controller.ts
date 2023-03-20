import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PropostaService } from './proposta.service';
import { CreatePropostaDto } from './dto/create-proposta.dto';
import { UpdatePropostaDto } from './dto/update-proposta.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@Controller()
export class PropostaController {
  constructor(
    private readonly propostaService: PropostaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/proposta')
  create(
    @Body() createPropostaDto: CreatePropostaDto,
    @Request() req,
  ) {
    const reqUser = req.user;
    return this.propostaService.create(
      reqUser,
      createPropostaDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/propostas')
  findAll() {
    return this.propostaService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/proposta/:id')
  findOne(@Param('id') id: string) {
    return this.propostaService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/proposta/:id')
  update(
    @Param('id') id: string,
    @Body() updatePropostaDto: UpdatePropostaDto,
    @Request() req,
  ) {
    const reqUser = req.user;
    return this.propostaService.update(
      reqUser,
      +id,
      updatePropostaDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/proposta/:id')
  remove(@Param('id') id: string, @Request() req) {
    const reqUser = req.user;
    return this.propostaService.remove(reqUser, +id);
  }
}
