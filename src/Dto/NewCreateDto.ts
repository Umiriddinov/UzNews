export class NewsCreateDto {
    title: string = '';
    image: File | null = null;
    content: string = '';
    tagIds: number[] = [];
    newTags: string[] = [];
  }
  

  