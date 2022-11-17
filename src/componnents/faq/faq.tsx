import { FC } from 'react'
import React from 'react'
import { Paper, Box, Button } from '@mui/material'

const Faq: FC = () => (
  <Paper sx={{ padding: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button href="https://discord.gg/b4UfWreAAs" target="_blank">
        feedback
      </Button>
    </Box>
    <p>
      A: To start using the site, go to your profile and enter the name of your
      character (required) discord (optional)
    </p>
    <p> A: You are showed as online while being connected to a site.</p>
    <p>
      A: Please include your discord if you&apos;d like admins to assist you in
      case of playesr in-game or discord attemps to scam / if you got scammed.
    </p>
    <p>
      A: vouch system fully based on unique vouches. For example you can only
      leave a vouch to exact player once, and it can&apos;t be cancelled (system
      is WIP for now). Cannot be canceled (the system is being tested and may be
      changed in the future)
    </p>
    <p>A: Please leave your feedback - help us make the site better.</p>
    <p>
      A: Для начала пользованием сайта пройдите в профиль и укажите свое имя
      персонажа (обязательно) дискорд (необязательно)
    </p>
    <p>
      A: Система воучей полностью базируется на уникальном воуче. Вы можете
      оставить конкретному пользователю воуч всего раз. Отмениить его нельзя
      (системы тестируется и в будущем может быть изменена)
    </p>
    <p>
      A: Пожалуйста, оставьте свой фитбек - помогите нам сделать сайт лучше.
    </p>

    <p>A: Вас видно в трейде пока вы находитесь на сайте ( открыта вкладка).</p>
    <p>
      A: Указывайте дискорд если хотите легитимного разбирательства репортов на
      вас
    </p>
  </Paper>
)

export default Faq
