import z from 'zod'

export type Technologies = 'angular' | 'react' | 'nextjs' | 'vue' | 'nuxt' | 'astro' | 'tailwindcss' | 'tensorflowjs' | 'typescript' | 'python' | 'fastapi' | 'tensorflow'
export type ProjectType = 'Web App' | 'Web App Template' | 'Cron Job' | 'Game' | 'Library' | 'API' | 'Bot' | 'ML Model'
export type ProjectStage = 'Planning' | 'Development' | 'Stable' | 'Maintenance' | 'Archived'

export const emailFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(100, 'Company name must be at most 100 characters'),
  email: z.email('Please enter a valid email address'),
  projectDescription: z.string().min(10, 'Project description must be at least 10 characters').max(1000, 'Project description must be under 1000 characters'),
  meetingTime: z.string().refine(
    (val) => {
      const date = new Date(val)
      if (isNaN(date.getTime())) return false
      const hour = date.getHours()
      return hour >= 10 && hour < 18 // office hours check
    },
    {
      message: 'Meeting time must be between 10:00 and 18:00',
    }
  ),
})

export interface Image {
  id: string
  title: string
}

export interface BaseProject {
  id: string
  name: string
  repo: string
  stage: ProjectStage
  type: ProjectType[]
  technologies: Technologies[]
  createdAt: string
  appURL: string | null
  videoURL: string | null
  images: Image[]
  url: string
}

export interface Project extends Omit<BaseProject, 'technologies' | 'stage' | 'type'> {
  description: string
  version: string
  stars: number
  forks: number
  technologies: Technologies[]
  updatedAt: string
}

export interface GithubDetailsResponse {
  id: number
  name: string
  repo: string
  description: string
  createdAt: string
  updatedAt: string
  pushedAt: string
  stars: number
  watchers: number
  forks: number
  defaultBranch: 'main'
}

export interface GithubReleaseResponse {
  id: number
  tag: string
  author: string
  name: string
  draft: boolean
  prerelease: boolean
  createdAt: string
  publishedAt: string
  markdown: string
  html: string
}

export interface Hackathon {
  name: string
  url: string
  project: string
  position: string
  startedAt: string
  image: {
    id: string
    title: string
  }
}

export interface Experience {
  company: string
  date: {
    start: string
    end: string
  }
  position: string
  image: {
    id: string
    title: string
  }
}

export interface Certificate {
  name: string
  link: string
  date: string
  image: {
    id: string
    title: string
  }
}

export interface EmailMetaData {
  fromCompanyName: string
  fromCompanyLogo: string
  fromCompanyLink: string
  fromCompanyPhone: string
  fromEmail: string
}

export interface ProspectEmail {
  fromFeaturedProjects?: { id: string; name: string; description: string; url: string }[]
  toCompanyName: string
  toEmail: string
}

export interface ContactEmail {
  toPersonName: string
  toCompanyName: string
  toEmail: string
  toProjectDescription: string
  toMeetingTime: string
  toMeetingLink: string
}

export type EmailTemplateData = {
  prospect: ProspectEmail
  contact: ContactEmail
}

export interface TransactionalEmail<T extends keyof EmailTemplateData> {
  template: T
  data: EmailTemplateData[T]
}

export interface PushNotificationSubscription {
  endpoint: string
  expirationTime: null
  keys: {
    p256dh: string
    auth: string
  }
}

export interface EmailSubscription {
  name: string
  email: string
}

export interface WhatsappSubscription {
  name: string
  phone: string
}

/* Server Only */
export const resourceTypes = ['prospect', 'client', 'project', 'asset'] as const

export type ResourceType = (typeof resourceTypes)[number]

export type NotionDB = { [K in ResourceType]: string }

export interface ResourceRecordMap {
  project: NotionProject
  asset: NotionProjectAsset
  newsletter: NotionNewsletter
  company: NotionCompany
}

type NotionImage =
  | {
      type: 'file'
      file: {
        url: string
        expiry_time: string
      }
    }
  | {
      type: 'external'
      external: {
        url: string
      }
    }
  | null

export interface NotionProject {
  id: string
  cover: NotionImage
  icon: NotionImage
  properties: {
    Name: {
      type: string
      title: {
        type: string
        text: {
          content: string
          link: null
        }
        plain_text: string
        href: null
      }[]
    }
    Stage: {
      type: string
      status: {
        name: string
        color: string
      }
    }
    Type: {
      type: 'multi_select'
      multi_select: { name: ProjectType; color: string }[]
    }
    Stack: {
      type: 'multi_select'
      multi_select: { name: Technologies; color: string }[]
    }
    Priority: {
      type: string
      select: {
        name: string
        color: string
      }
    }
    Completion: {
      type: string
      rollup: {
        type: string
        number: null
        function: string
      }
    }
    Period: {
      type: string
      date: {
        start: string
        end: null
      }
    }
    Postman: {
      url: string
    }
    Github: {
      url: string
    }
    App: {
      url: string
    }
    'Better Stack': {
      url: string
    }
    Asset: { type: 'relation'; relation: { id: string }[]; has_more: boolean }
    Video: {
      url: string
    }
  }
}

export interface NotionProjectAsset {
  id: string
  cover: NotionImage
  icon: NotionImage
  properties: {
    Project: {
      type: string
      relation: { id: string }[]
      has_more: boolean
    }
    Name: {
      type: string
      title: {
        type: string
        text: {
          content: string
          link: null
        }
        plain_text: string
        href: null
      }[]
    }
    Description: {
      id: string
      type: string
      rich_text: { plain_text: string }[]
    }
    Status: {
      type: string
      status: {
        name: string
        color: string
      }
    }
    'Aspect ratio': {
      id: string
      type: string
      select: {
        name: string
        color: string
      }[]
    }
    Gallery: {
      id: string
      type: string
      number: number
    }
    Resolution: {
      id: string
      type: string
      select: {
        name: string
        color: string
      }[]
    }
  }
}

export interface NotionNewsletter {
  id: string
  cover: NotionImage
  icon: NotionImage
  // properties: {}
}

export interface NotionCompany {
  id: string
  cover: NotionImage
  icon: NotionImage
  properties: {
    Index: { type: 'unique_id'; unique_id: [object] }
    Name: {
      type: string
      title: {
        type: string
        text: {
          content: string
          link: null
        }
        plain_text: string
        href: null
      }[]
    }
    Status: {
      type: string
      status: {
        name: string
        color: string
      }
    }
    Platform: {
      type: 'multi_select'
      multi_select: { name: string; color: string }[]
    }
    Role: {
      type: 'multi_select'
      multi_select: { name: string; color: string }[]
    }
    Type: { select: string[] }
    Phone: { phone_number: null }
    Website: { type: 'url'; url: string }
    LinkedIn: { type: 'url'; url: string }
    Email: { type: 'email'; email: string }
    'Working Period': { type: 'date'; date: [object] }
    Salary: { type: 'number'; number: number }
  }
}
