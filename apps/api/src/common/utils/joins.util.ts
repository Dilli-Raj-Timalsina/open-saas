/***
 ##  Diffrence between inner joins and left joins 
 =>  The difference between LEFT JOIN and INNER JOIN is that INNER JOIN won't return a user if it does not have any photos. LEFT JOIN will return you the user even if it doesn't have photos. 


 example :
 const user = await createQueryBuilder("user")
    .innerJoinAndSelect(
        "user.photos",
        "photo",
        "photo.isRemoved = :isRemoved", //you can neglect this isremoved condition as well
        { isRemoved: false },
    )
    .where("user.name = :name", { name: "Timber" })
    .getOne()

    As you can see leftJoinAndSelect automatically loaded all of Timber's photos. The first argument is the relation you want to load and the second argument is an alias you assign to this relation's table. You can use this alias anywhere in query builder. For example, let's take all Timber's photos which aren't removed.



 ## joins without selection 
 => You can join data without its selection. To do that, use leftJoin or innerJoin .This will select Timber if he has photos, but won't return his photos.

   example :
   const user = await createQueryBuilder("user")
    .innerJoin("user.photos" , "photo")
    .where("user.name = :name", { name: "Timber" })
    .getOne()



  ## VIP :
  ## joining unrelated entities :
    let query = this.stocksListedRepository
        .createQueryBuilder('stocksListed')
        .innerJoinAndSelect('stocksListed.stockData'(relation entiity name), 'stockData'(alias which we will use in creating query)) //This is joining related entities 
        .innerJoinAndSelect( //This is joining unrelated entities
          'beta_analysis', // table name (should be in same db)
          'beta_analysis', //(alias which we will use for select and other query)
          'beta_analysis.symbol = stocksListed.symbol', // joining fields 
        )
 */

/**
  # Diffrence between inner joins and left joins  :

  INNER JOIN:

An INNER JOIN returns only the rows that have matching values in both tables based on the join condition.
If a row in one table doesn't have a matching row in the other table, it will not be included in the result set.
The result contains only the common records between the two tables.
Example: Suppose we have two tables, "employees" and "departments", and we want to retrieve the list of employees along with their department names (assuming each employee belongs to a department). An INNER JOIN would return only the employees who are associated with a department. Employees without a department will not be included in the result set.

sql

SELECT employees.name, departments.department_name
FROM employees
INNER JOIN departments ON employees.department_id = departments.department_id;
LEFT JOIN:

A LEFT JOIN returns all the rows from the left table and the matched rows from the right table. If there is no matching row in the right table, NULL values are returned for the columns from the right table.
The result contains all the records from the left table, and the matching records from the right table. If there is no match in the right table, NULL values are included for the columns from the right table in the result set.
Example: Continuing with the previous example, if we change the JOIN type to LEFT JOIN, the result will include all employees regardless of whether they have a department assigned. If an employee doesn't have a department, the department name will be NULL in the result set.

sql

SELECT employees.name, departments.department_name
FROM employees
LEFT JOIN departments ON employees.department_id = departments.department_id;

 
 
 */
