export interface Country {
    pos:number,
    id:number,
    name:string,
    toll:number,
    recovered:number,
    deaths:number,
    sick:number,
    history:{
        toll:Timeline,
        recovered:Timeline,
        deaths:Timeline,
        sick:Timeline
    }
}

interface Timeline{
    [date:string]:number
}
