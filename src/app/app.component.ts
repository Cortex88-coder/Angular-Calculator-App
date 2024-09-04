import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from './calculator-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  inputNumberDisplay: string = '';
  currentNumber: string = '';
  firstOperand: number | null = null;
  operator: string | null = null;
  shouldResetInputNumberDisplay: boolean = false;

  constructor(private calculatorService: CalculatorService) {}

  inputExpression(number: string) {
    if (this.shouldResetInputNumberDisplay) {
      this.inputNumberDisplay = '';
      this.shouldResetInputNumberDisplay = false;
    }
    this.currentNumber += number;
    this.inputNumberDisplay += number;
  }

  clear() {
    this.inputNumberDisplay = '';
    this.currentNumber = '';
    this.firstOperand = null;
    this.operator = null;
  }

  setOperation(operation: string) {
    if (this.currentNumber === '') return;

    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.currentNumber);
    } else if (this.operator) {
      this.calculate();
    }

    this.operator = operation;
    this.currentNumber = '';
    this.inputNumberDisplay += ` ${this.getOperatorSymbol(operation)} `;
    this.shouldResetInputNumberDisplay = true;
  }

  private getOperatorSymbol(operation: string): string {
    return operation;
  }

  calculate() {
    if (
      this.firstOperand === null ||
      this.operator === null ||
      this.currentNumber === ''
    )
      return;

    const secondOperand = parseFloat(this.currentNumber);
    let result: number;

    switch (this.operator) {
      case '+':
        result = this.calculatorService.add(this.firstOperand, secondOperand);
        break;
      case '-':
        result = this.calculatorService.substract(
          this.firstOperand,
          secondOperand
        );
        break;
      case '*':
        result = this.calculatorService.multiply(
          this.firstOperand,
          secondOperand
        );
        break;
      case '/':
        result = this.calculatorService.divide(
          this.firstOperand,
          secondOperand
        );
        break;
      default:
        return;
    }

    this.inputNumberDisplay = result.toString();
    this.currentNumber = '';
    // this.firstOperand = result;
    this.operator = null;
  }
}
