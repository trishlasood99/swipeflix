export class UserPreference {
  constructor(public _id:String,public user: string,public genres: string[],public imdb_rating: number,public page: number,public __v: number) {

  }
}
