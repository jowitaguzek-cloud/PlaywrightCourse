// @ts-check
import { test, expect } from '@playwright/test';
import { Playground } from '../pages/playground';

test.beforeEach(async ({ page }) => {
  const playground = new Playground(page);
  await playground.navigateTo();
});

test('Button section - button displays correct status after clicking', async ({ page }) => {
  const playground = new Playground(page);
  await playground.clickButtonInGivenState(true);
  await playground.clickButtonInGivenState(false);
});


test('Button with timer - single click', async ({page}) => {
  
  const playground = new Playground(page);
  const buttonLoadTimeout =  7000; // button can be updated in between 3 and 7 seconds

  await playground.expectTimerHeadingVisible();
  await playground.expectTimerStatus('Waiting for click');
  
  await playground.clickTimerButton();

  await playground.expectTimerStatus('Processing...');

  await playground.expectTimerStatus('Complete', buttonLoadTimeout);


});

test('Button with timer - multiple click', async ({ page }) => {

  const playground = new Playground(page);
  const buttonLoadTimeout = 7000; // button can be updated in beetween 3 and 7 seconds

  await playground.expectTimerHeadingVisible();

  await playground.expectTimerStatus('Waiting for click');

  await playground.clickTimerButton();
  await playground.expectTimerStatus('Processing...');
  await playground.expectTimerStatus('Complete', buttonLoadTimeout);

  await playground.clickTimerButton();
  await playground.expectTimerStatus('Processing...');
  await playground.expectTimerStatus('Complete', buttonLoadTimeout);

});