function duplicate(arr){
    let unique = [];
    for(let i=0; i<arr.length; i ++){
        if(unique.includes(arr[i])===false){
            unique.push(arr[i]);
        }
    }
    return unique;
}

duplicate(1,4,4,3,5,-1,2,-2,-1)