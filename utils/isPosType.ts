export const isPosType = (obj : any) :boolean =>{ 
    return typeof obj?.x === "number" &&  typeof obj?.y === "number" 
}