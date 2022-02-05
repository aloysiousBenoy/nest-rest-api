import { Inject, Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { isValidObjectId, Model, mongo } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }
  async findOne(id: string): Promise<Item> {
    if (!isValidObjectId(id)) throw new Error('Invalid object ID');

    return await this.itemModel.findById(id);
  }
  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }
  async update(item: Item, id: string): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndDelete({ _id: id });
  }
}
