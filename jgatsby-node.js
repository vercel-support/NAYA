const _ = require('lodash')
const path = require(`path`)

async function createBlogPages(graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allWpPost(sort: { fields: [date] }) {
        edges {
          node {
            id
            slug
          }
        }
      }
      allWpProduct {
        edges {
          node {
            id
            slug
            productCategories {
              nodes {
                name
              }
            }
          }
        }
      }
      allWpCategory(filter: { id: { ne: "dGVybTox" } }) {
        nodes {
          name
        }
      }
      allWpTag {
        nodes {
          name
        }
      }
    }
  `)

  if (result.errors) throw new Error(result.errors)

  const { allWpPost, allWpProduct, allWpCategory, allWpTag } = result.data

  await allWpPost.edges.forEach(edge => {
    createPage({
      path: `post/${edge.node.slug}`,
      component: path.resolve("./src/templates/blog-post-template.js"),
      context: {
        id: edge.node.id,
        slug: edge.node.slug,
      },
    })
  })

  await allWpProduct.edges.forEach(node => {
    //let category = node.productCategories.nodes[0].name.toLowerCase()
    let slug = `product/${node.node.slug}`
    console.log('slug', slug);

    createPage({
      path: slug,
      component: path.resolve("./src/templates/product-template.js"),
      context: {
        id: node.node.id,
        slug: slug,
      },
    })
  })

  await allWpCategory.nodes.forEach(node => {
    const categoryPath = `/categories/${_.kebabCase(node.name)}`
    createPage({
      path: categoryPath,
      component: path.resolve("./src/templates/category-template.js"),
      context: { category: node.name },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await createBlogPages(graphql, actions)
}
