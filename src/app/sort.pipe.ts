import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'branchSort'
})
export class SortPipe implements PipeTransform {
  transform(cars: any[]): { [branch: string]: any[] } {
    if (!cars || cars.length === 0) {
      return {};
    }

    cars.sort((a, b) => a.branch.localeCompare(b.branch));

    const carsByBranch = cars.reduce((groupedCars, car) => {
      const branch = car.branch;
      if (!groupedCars[branch]) {
        groupedCars[branch] = [];
      }
      groupedCars[branch].push(car);
      return groupedCars;
    }, {});

    return carsByBranch;
  }
}
