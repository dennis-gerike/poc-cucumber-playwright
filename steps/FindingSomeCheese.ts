import {createBdd} from 'playwright-bdd';
import {test} from './fixtures';
import {expect} from '@playwright/test';

const {Given, When, Then} = createBdd(test);

Given("I am on the Google search page", async ({page}) => {
    await page.goto("https://www.google.com/");
    await page.getByRole('button', {name: 'Alle ablehnen'})
        .click();
})

When("I search for {string}", async ({page}, query: string) => {
    await page.locator("[name=q]")
        .fill(query);
    await page.keyboard.press("Enter");
    await page.locator("[role=listitem]")
        .waitFor();
})

Then("the page title should start with {string}", async ({page}, title: string) => {
    const pageTitle = await page.title();
    expect(pageTitle.toLowerCase())
        .toContain(title.toLowerCase());
})
