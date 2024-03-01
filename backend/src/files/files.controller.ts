import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { AtGuard } from 'src/common/decorators/guards';

@Controller('files')
export class FilesController {
  @UseGuards(AtGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if(!file){
      throw new Error('No file to upload')
    }
    console.log('File uploaded',file);
    return {message:"file uploaded successfully"}
  }
}
