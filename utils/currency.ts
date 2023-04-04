export const format=(value:number)=>{

    const formatter=new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD",
        minimumIntegerDigits:2,
        maximumFractionDigits:2,
    })
    return formatter.format(value)
}