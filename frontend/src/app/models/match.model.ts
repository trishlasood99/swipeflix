export class Match{

  constructor(public _id: string, public userId1: string, public userId2: string,
    public movieId: string, public username1: string, public username2: string,
    public movieName: string, public isDateSet: boolean, public date: Date,
    public __v: number) {

  }
}
