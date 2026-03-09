import { expect } from "@playwright/test";
export class Playground {
    constructor(page) {
        this.page = page;
        this.url = 'playground/'
        this.clickableButton = this.page.locator('#btn-click-me');
        this.clickableButtonStatus = this.page.getByTestId('btn-state');
        this.initalStatus = 'Status: idle';
        this.clickedStatus = 'Status: clicked';

        //zadanie dom - single click
        this.timerHeading = this.page.getByRole('heading', {name: 'Timer button'});
        this.timerButton = this.page.getByTestId('timer-btn');
        this.timerResult = this.page.getByTestId('timer-result');

        //multiple click
    }
    async navigateTo() {
        await this.page.goto(this.url);
    }
    async clickButtonInGivenState(initial) {
        if (initial) {
            await expect(this.clickableButtonStatus).toContainText(this.initalStatus);
            await this.clickableButton.click();
            await expect(this.clickableButtonStatus).toContainText(this.clickedStatus);
        }
        else {
            await expect(this.clickableButtonStatus).toContainText(this.clickedStatus);
            await this.clickableButton.click();
            await expect(this.clickableButtonStatus).toContainText(this.initalStatus);
        }
    }
// tu zadanie dom
    async expectTimerHeadingVisible() {
      await expect(this.timerHeading).toBeVisible();
    }

    async expectTimerStatus(text, timeout = 0) {

      if (timeout > 0) {
        await expect(this.timerResult).toHaveText(text, { timeout });
      } else {
        await expect(this.timerResult).toHaveText(text);
      }
    
    }

    async clickTimerButton() {
      await this.timerButton.click();
  }
}
module.exports = { Playground }