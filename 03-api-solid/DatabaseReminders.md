We can have the relations

1-1 

When we have a one to one relationship, where one data of a table, and one data of another, we only created these columns
to separate the data for the twp tables, because they probably could be at the same, and we separated only to be more semantic


1-N


Relationship of 1 to N, means that one information, that is stored in a table, can have registries on another table, like

1 user can make many checkins, is a 1 to n relationship


N-N

The relationship N to N, is when we have a registry that can be related to many registries on another table and one registry
of that other table can be in many registries of the first table

one example is, let's say that we are going to a gym in a group of four, so are four users related to the same checkin
while we can have many checkins for each one of these users

---------------------------------------------------------------------------------

Prisma relation

Here i'll explain step by step what i'm doing

Created the columns user_id of the same type as the id on the User table aswell as the gym_id, both inside the checkins table

if we run a migrate dev now, it will create these columns, but they won't have foreign key relation between them

Now, if i say that if checkin is related to the model User

user User this User is of the type of that model, and the user before the User is not going to be the name of the column
but is as it would be, we are determining the name of the model, user will be the name of the relationship

at the moment that we save that user User line, because of the prisma extension, it will update the line to

user User @relation(fields: [userId], references: [id])

the @relation is telling to create a foreignKey, in our case userId, that references the id on the model User

this will also create the reference in the User table, that reference is this way

  CheckIn CheckIn[]

and this CheckIn is the name of the relation with the CheckIn model, because it is an array, the CheckIn column can be
many CheckIns

So now we know a user can have many check ins, and in addition to prisma, when we work with relationships, keep a reference
to the relationship, like check in will always be related to a user, he also creates the inverse relationship. 

It's very important to understand that only the fields with names in blue, such as String, DateTime, etc, which are primitive types we can have in our tables, will be created in the DB, so fiels like user User, checkin CheckIn
will generate a column in our table. Visually they are going to generate nothing for us, they will exist only for prisma to 
to understand that this relationship exists.

for a better understanding CheckIn CheckIn[] will be updated to checkIns CheckIn[]

checkIns is going to be the name of the relationship, so both on the user and on the checkIns, that are columns we won't
save on the database, in this specific cases, we use camelCase, because the name we give on relationships is the name we
are going to use to access in javascript when we want to work with these relationships in prisma.

When we created the relations in prisma, saying that a check in will have a user_id and a gym_id, it automatically created
the reverse relation on these tables, saying that they have an array of checkins, but when we migrated them, none of these
checkIns CheckIn[] were created, only the user_id with the type of the column

