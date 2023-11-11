import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
    test("add new blog", async () => {
        const createBlog = jest.fn();
        const user = userEvent.setup();

        render(<BlogForm createBlog={createBlog} />);

        const titleInput = screen.getByRole("input-title");
        const authorInput = screen.getByRole("input-author");
        const urlInput = screen.getByRole("input-url");
        const create = screen.getByText("create");

        await user.type(titleInput, "test title");
        await user.type(authorInput, "test author");
        await user.type(urlInput, "test url");
        await user.click(create);

        expect(createBlog.mock.calls).toHaveLength(1);
        expect(createBlog.mock.calls[0][0].title).toBe("test title");
        expect(createBlog.mock.calls[0][0].author).toBe("test author");
        expect(createBlog.mock.calls[0][0].url).toBe("test url");
    });
});
