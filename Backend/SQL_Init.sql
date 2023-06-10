Drop Table Meal;
Drop Table ingredient;
Drop Table MealContainsIngredient;


Create Table Meal (
    id    varchar(100),
    name  varchar(100) NOT NULL,
    instructions varchar(1000) NOT NULL,
    Primary Key (id)
);

Create Table Ingredient (
    id    varchar(100),
    name  varchar(100) NOT NULL,
    Primary Key (id)
);

Create Table MealContainsIngredient (
    meal  varchar(100),
    ingredient varchar(100),
    quantity float,
    unit varchar(10),
    Primary Key (meal, ingredient),
    Foreign key (meal) References Meal (id) ON DELETE CASCADE,
    Foreign key (ingredient) References Ingredient (id) ON DELETE CASCADE
);


Select * from ingredient;
Select * from meal;
Select * from mealcontainsingredient;