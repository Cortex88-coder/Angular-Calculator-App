import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  add(firstOperand: number, secondOperand: number): number {
    return firstOperand + secondOperand;
  }

  multiply(firstOperand: number, secondOperand: number): number {
    return firstOperand * secondOperand;
  }

  substract(firstOperand: number, secondOperand: number): number {
    return firstOperand - secondOperand;
  }

  divide(firstOperand: number, secondOperand: number): number {
    return firstOperand / secondOperand;
  }
}
