const bcrypt = require('bcrypt')
const { db } = require('../config/config.finance.js')

const _registerUser = async (userData) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    // monthly_income,
    // currency,
  } = userData

  let trx

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    trx = await db.transaction()

    const [user] = await trx('users').insert(
      {
        first_name,
        last_name,
        username,
        email,
      },
      ['id']
    )

    await trx('hashpwd').insert({
      user_id: user.id,
      password: hashedPassword,
    })

    await trx.commit()

    return {
      user,
    }
  } catch (error) {
    if (trx) {
      await trx.rollback()
    }
    console.error('Error registering user:', error)
    throw new Error('Internal Server Error')
  }
}

const _userIncome = async (incomeData, userId, currency) => {
  try {
    trx = await db.transaction()

    await trx('income').insert({
      user_id: userId,
      monthly_income: incomeData,
      currency: currency,
    })

    // Calculate and insert 50-30-20 into budget table
    const totalIncome = incomeData
    const necessities = totalIncome * 0.5
    const entertainment = totalIncome * 0.3
    const savings = totalIncome * 0.2

    await trx('budget').insert({
      user_id: userId,
      necessities_50: necessities,
      entertainment_30: entertainment,
      savings_20: savings,
    })

    await trx.commit()

    return {
      message: `User ${userId} income of ${totalIncome} was registered.`,
    }
  } catch (error) {
    if (trx) {
      await trx.rollback()
    }
    console.error('Error registering user income:', error)
    throw new Error('Internal Server Error')
  }
}

const _getUserByEmail = async (userLogin) => {
  const { username, password } = userLogin
  try {
    const user = await db('users')
      .select(
        'users.id',
        'users.first_name',
        'users.last_name',
        'users.username',
        'income.monthly_income',
        'income.currency',
        'hashpwd.password',
        'budget.necessities_50',
        'budget.entertainment_30',
        'budget.savings_20'
      )
      .where('users.username', username)
      .leftJoin('income', 'users.id', 'income.user_id')
      .leftJoin('hashpwd', 'users.id', 'hashpwd.user_id')
      .leftJoin('budget', 'users.id', 'budget.user_id')
      .first()

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Invalid credentials')
    }

    delete user.password

    return user
  } catch (error) {
    throw new Error(error.message)
  }
}


const _budgetUser = async (userId) => {
  try {
    const userBudget = await db('budget')
      .where('budget.user_id', userId)
      .leftJoin('users', 'budget.user_id', 'users.id')
      .leftJoin('income', 'income.user_id', 'users.id')
      .select(
        'budget.*',
        'users.first_name',
        'users.last_name',
        'income.currency'
      )
      .first()

    if (!userBudget) {
      throw new Error('Budget not found')
    }

    return userBudget
  } catch (error) {
    throw error
  }
}

const _updateIncome = async (userId, monthlyIncome, currency) => {
  let trx

  try {
    trx = await db.transaction()

    await trx('income')
      .where('user_id', userId)
      .update({ monthly_income: monthlyIncome, currency: currency })

    // Calculate and insert 50-30-20 into budget table

    const totalIncome = monthlyIncome
    const necessities = totalIncome * 0.5
    const entertainment = totalIncome * 0.3
    const savings = totalIncome * 0.2

    await trx('budget').where('user_id', userId).update({
      necessities_50: necessities,
      entertainment_30: entertainment,
      savings_20: savings,
    })
    await trx.commit()
    return { message: 'Income updated successfully' }
  } catch (error) {
    if (trx) {
      await trx.rollback()
    }
    throw error
  }
}

module.exports = {
  _registerUser,
  _userIncome,
  _getUserByEmail,
  _budgetUser,
  _updateIncome,
}
