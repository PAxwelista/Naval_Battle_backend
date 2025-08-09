import { isPosType } from "../utils"

describe("Function isPosType" , ()=>{
    it("should return true with {x:1,y:2}",()=>{
        const value =  {x:1,y:2}
        expect(isPosType(value)).toBeTruthy()
    })
    it("should return false with {x:'1',y:2}",()=>{
        const value =  {x:'1',y:2}
        expect(isPosType(value)).toBeFalsy()
    })
    it("should return false with {x:1,z:2}",()=>{
        const value =  {x:1,z:2}
        expect(isPosType(value)).toBeFalsy()
    })
})