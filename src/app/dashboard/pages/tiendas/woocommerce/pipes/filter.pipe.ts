import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrder'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any{


    if(arg === '' || arg.length < 3 ) return value;


    const filteredOrders = [];

    for(const order of value ) {

      // if(order.first_name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        
      //   filteredOrders.push(order);
      // };

      if (
        (order.first_name.toLowerCase().includes(arg.toLowerCase())) ||
       
        (order.product.toLowerCase().includes(arg.toLowerCase())) ||

        (typeof order.order_id === 'number' && order.order_id.includes(arg) )
      ) {
        filteredOrders.push(order);
      }
    };

    return filteredOrders;
  }

}
