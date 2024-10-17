export class ApiFeature {
    constructor(mongoosrQuery , queryData){
        this.mongoosrQuery = mongoosrQuery;
        this.queryData = queryData
    }

    pagnation(){
        let{page , size} = this.queryData
        if(!page || page <= 0){
            page = 1
        }
        if(!size || size <= 0){
            size = 3 
        }
        let skip = (page - 1) * size
        this.mongoosrQuery.limit(size).skip(skip)
        return this

    }
    sort(){
        let {sort} = this.queryData
        sort = sort?.replaceAll(',', '')
        this.mongoosrQuery.sort(sort)
        return this
    }
    select(){
        let {select} = this.queryData
        select = select?.replaceAll(',', '')
        this.mongoosrQuery.select(select)
        return this

    }
    filter(){
        let { size , page , sort, select, ...filter} = req.body
    filter = JSON.parse(JSON.stringify(filter).replace(/'gte|gt|lte|lt'/g, match=> `$${match}`))
    this.mongoosrQuery.find(filter)
    return this
    }
}