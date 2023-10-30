import React from "react"
import "@testing-library/jest-dom"
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog";

describe('<Blog/>', () => {
    test('renders title and author, but not url and likes', () => {
        const blog = {
            title: 'Test title',
            author: 'Test author',
            url: 'https://www.google.com',
            likes: 0,
            user: {
                username: 'test'
            }
        }

        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} user={blog.user}/>
        ).container

        const title = component.querySelector('.title')
        expect(title).toHaveTextContent('Test title')

        const author = component.querySelector('.author')
        expect(author).toHaveTextContent('Test author')

        const url = component.querySelector('.url')
        expect(url).toBeNull()

        const likes = component.querySelector('.likes')
        expect(likes).toBeNull()
    });
});