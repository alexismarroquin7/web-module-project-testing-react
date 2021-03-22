import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "../Display";
import mockFetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow");

const testShow = {
    //add in approprate test data structure here.
    name: "Stranger Things",
    summary: "This is the summary text",
    seasons: [
        {
            id: 2344,
            name: "Season 1",
            episodes: [
                {id: 3463, url: ""}
            ]
        },
        {
            id: 2233,
            name: "Season 2",
            episodes: [
                {id: 3434, url: ""}
            ]
        }
    ]
}

test("renders without errors", () => {
    render(<Display />);
});

test("when fetch button is pressed the Show component will display", async () => {
    //arrange:
    render(<Display />);

    //act:
    mockFetchShow.mockResolvedValueOnce(testShow);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const showContainer = await screen.findByTestId("show-container");
    
    //assert:
    expect(button).not.toBeInTheDocument();
    expect(showContainer).toBeInTheDocument();

});

test("when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons", async () => {
    //arrange:
    render(<Display />);

    //act:
    mockFetchShow.mockResolvedValueOnce(testShow);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const select = await screen.findByRole("combobox");

    //assert:
    expect(select.children).toHaveLength(3);

});

test("when the fetch button is press, the displayFunc function is called", async () => {
    //arrange:
    const mockDisplayFunc = jest.fn();
    render(<Display displayFunc={mockDisplayFunc}/>);

    //act:
    mockFetchShow.mockResolvedValueOnce(testShow);

    const button = screen.getByRole("button");
    userEvent.click(button);

    //assert:
    await waitFor(() => {
        expect(mockDisplayFunc).toBeCalledTimes(1);
    })

});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.