/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Share data between steps in Cucumber using Scenario Context
 */
import { ENUM_CONTEXT } from '../enum/contextEnum';

class ScenarioContext {
  private scenarioContext;

  constructor() {
    this.scenarioContext = {};
  }

  /**
   * This method takes the key as a parameter and returns the any which matches the key.
   * @param key
   * @returns
   */
  getContext(key: ENUM_CONTEXT): any {
    const contextKey = ENUM_CONTEXT[key].toString();
    Cypress.log({ displayName: 'SHARED CONTEXT: ', message: [`Getting Scenario Context ${contextKey}`] });
    return this.scenarioContext[contextKey];
  }

  /**
   * This method takes two parameters, key as CONTEXT and value as any.
   * @param key
   * @param value
   */
  setContext(key: ENUM_CONTEXT, value: any) {
    const contextKey = ENUM_CONTEXT[key].toString();
    Cypress.log({ displayName: 'SHARED CONTEXT: ', message: [`Setting Scenario Context ${contextKey}`] });
    this.scenarioContext[contextKey] = value;
  }

  /**
   * This method performs a check on the complete Map that if it contains the key or not.
   * @param key
   * @returns
   */
  isContains(key: ENUM_CONTEXT): boolean {
    Cypress.log({
      displayName: 'SHARED CONTEXT: ',
      message: [`Is Contains ${ENUM_CONTEXT[key]}: ${this.scenarioContext.hasOwnProperty(ENUM_CONTEXT[key])}`],
    });
    return this.scenarioContext.hasOwnProperty(ENUM_CONTEXT[key]);
  }
}

export default new ScenarioContext();
