Create Table Meal (
    id    int AUTO_INCREMENT,
    name  varchar(100) NOT NULL,
    instructions varchar(1000) NOT NULL,
    Primary Key (id)
);

Create Table Ingredient (
    id    int AUTO_INCREMENT,
    name  varchar(100) NOT NULL,
    Primary Key (id)
);

Create Table MealContainsIngredient (
    meal  int,
    ingredient int,
    quantity int, 
    unit varchar(10),
    Primary Key (meal, ingredient),
    Foreign key (meal) References Meal (id) ON DELETE CASCADE,
    Foreign key (ingredient) References Ingredient (id) ON DELETE CASCADE
);