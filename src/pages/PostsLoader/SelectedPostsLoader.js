
import { useRouteLoaderData } from "react-router-dom"

function SelectedPostsLoader() {
    // eslint-disable-next-line
    const selectedPosts = useRouteLoaderData('posts-loader')

    return (
        <div>SelectedPostsLoader</div>
    )
}
export default SelectedPostsLoader