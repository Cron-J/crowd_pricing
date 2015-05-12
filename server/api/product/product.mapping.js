var productDetail = function(newData,oldData){
	console.log('i am here');
	if(newData.productName)
		oldData.productName = newData.productName;	
    if(newData.productDesc)
    	oldData.productDesc = newData.productDesc;
    if(newData.marketPrice)
    	oldData.marketPrice = newData.marketPrice;
    if(newData.expDate)
    	oldData.expDate  = newData.expDate;
	if(newData.city)
		oldData.city  = newData.city
	if(newData.status)
        oldData.status = newData.status;
    if(newData.rewardUnit)
        oldData.rewardUnit = newData.rewardUnit;
    
    return oldData;
}

exports.productDetail = productDetail