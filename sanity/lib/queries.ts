import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc){
  _id,
    author -> {
      _id, name, image, bio
    },
    _createdAt,
    views,
    description,
    image,
    category,
    title
}
`);

export const STARTUP_BY_ID_QUERY = defineQuery(
  `*[_type == "startup" && _id == $id][0]{
  _id,
    author -> {
      _id, name, image, bio, username
    },
    _createdAt,
    views,
    description,
    image,
    category,
    title,
    pitch
}
`
);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(
  `*[_type == "author" && id == $id][0]{
  _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`
);

export const AUTHOR_BY_ID_QUERY = defineQuery(
  `*[_type == "author" && _id == $id][0]{
  _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`
);

export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc){
  _id,
    author -> {
      _id, name, image, bio
    },
    _createdAt,
    views,
    description,
    image,
    category,
    title
}
`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
    slug,
    select[]-> {
    _id,
    _createdAt,
    title,
    slug,
    author -> {
      _id, name, image, bio, slug
    },
    views,
    description,
    category,
    image,
    pitch
    }
  }
`);
