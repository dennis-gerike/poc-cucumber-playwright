import {createBdd} from 'playwright-bdd';
import {test} from './fixtures';
import {expect} from '@playwright/test';

const {Given, When, Then} = createBdd(test);

Given("the user is on the Homepage", async ({page}) => {
    await page.goto("https://more-cars.net/");
});

When("the user wants to convert {float} {string} to {string}", async ({page}, fromValue: number, fromUnit: string, toUnit: string) => {
    await page.locator("#unit_converter_from_unit")
        .selectOption(fromUnit);

    await page.locator("#unit_converter_to_unit")
        .selectOption(toUnit);

    await page.locator("[name=from_value]")
        .fill(fromValue.toString());

    await page.getByRole('button', {name: 'Convert now'})
        .click();
});

Then("the unit converter should display {string} in the result field", async ({page}, expectedResult: string) => {
    await expect(page.locator("[name=result]"))
        .toHaveValue(expectedResult);
});
