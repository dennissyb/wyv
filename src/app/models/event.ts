export class Event 
{
 constructor(public title:string,
    public date:Date,public venue : string,
     public entranceFee:string, public artists:string[],
      public postor : string ){}

}