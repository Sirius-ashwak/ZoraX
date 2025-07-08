# Contributing to CredVault

Thank you for your interest in contributing to CredVault! This guide will help you get started with contributing to our creator-supporter platform.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

### Our Pledge

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Inclusive**: Welcome contributors from all backgrounds
- **Be Collaborative**: Work together towards common goals
- **Be Professional**: Maintain a professional and constructive environment

## Getting Started

### Prerequisites

Before contributing, make sure you have:
- **Node.js** 18.x or higher
- **Git** with basic knowledge of Git workflows
- **Code Editor** (VS Code recommended)
- **Web3 Wallet** for testing (MetaMask recommended)

### Development Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/credvault.git
   cd credvault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Run tests**
   ```bash
   npm test
   ```

For detailed setup instructions, see our [Development Guide](docs/DEVELOPMENT.md).

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

#### 🐛 Bug Reports
- Report bugs using GitHub Issues
- Include clear reproduction steps
- Provide environment information
- Add screenshots when helpful

#### ✨ Feature Requests
- Suggest new features via GitHub Issues
- Explain the use case and benefits
- Discuss implementation approaches
- Consider backward compatibility

#### 🔧 Code Contributions
- Fix bugs and implement features
- Improve performance and security
- Add tests and documentation
- Follow our coding standards

#### 📖 Documentation
- Improve existing documentation
- Add new guides and tutorials
- Fix typos and unclear explanations
- Translate content to other languages

#### 🎨 Design Contributions
- UI/UX improvements
- Visual design enhancements
- Accessibility improvements
- Mobile experience optimization

## Development Workflow

### Branch Strategy

We use a Git Flow-inspired branching strategy:

```
main          # Production-ready code
├── develop   # Development integration branch
├── feature/  # New features
├── bugfix/   # Bug fixes
├── hotfix/   # Critical production fixes
└── release/  # Release preparation
```

### Creating a Pull Request

1. **Create a feature branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Add tests for new functionality
   - Update documentation as needed
   - Follow our coding standards

3. **Test your changes**
   ```bash
   npm test
   npm run test:e2e
   npm run lint
   npm run type-check
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create PR on GitHub
   ```

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear commit messages:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

#### Examples
```bash
feat(campaigns): add campaign analytics dashboard
fix(auth): resolve wallet connection timeout issue
docs(api): update campaign endpoint documentation
test(components): add CampaignCard unit tests
```

## Coding Standards

### TypeScript Guidelines

#### Type Safety
```typescript
// ✅ Good - Explicit types
interface Campaign {
  id: string;
  title: string;
  creator: Address;
  price: bigint;
}

// ❌ Bad - Using 'any'
const campaign: any = {...};

// ✅ Good - Proper error handling
const createCampaign = async (data: CampaignData): Promise<Result<Campaign, Error>> => {
  try {
    // Implementation
    return { success: true, data: campaign };
  } catch (error) {
    return { success: false, error };
  }
};
```

#### Naming Conventions
```typescript
// Variables and functions: camelCase
const campaignId = 'campaign_123';
const createCampaign = () => {...};

// Types and interfaces: PascalCase
interface CampaignData {...}
type UserRole = 'creator' | 'supporter';

// Constants: SCREAMING_SNAKE_CASE
const MAX_CAMPAIGN_SUPPLY = 10000;
const API_BASE_URL = 'https://api.credvault.io';

// Components: PascalCase
const CampaignCard = () => {...};
```

### React Guidelines

#### Component Structure
```typescript
// ✅ Good component structure
interface CampaignCardProps {
  campaign: Campaign;
  onMint?: (campaignId: string) => void;
  className?: string;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onMint,
  className
}) => {
  // Hooks first
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  
  // Event handlers
  const handleMint = async () => {
    setIsLoading(true);
    try {
      await onMint?.(campaign.id);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Render
  return (
    <div className={cn('campaign-card', className)}>
      {/* Component content */}
    </div>
  );
};
```

#### Hooks Guidelines
```typescript
// ✅ Good custom hook
export const useCampaign = (campaignId: string) => {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const data = await api.campaigns.get(campaignId);
        setCampaign(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCampaign();
  }, [campaignId]);
  
  return { campaign, loading, error };
};
```

### CSS/Styling Guidelines

#### Tailwind CSS Usage
```typescript
// ✅ Good - Semantic class grouping
<div className={cn(
  // Layout
  'flex flex-col gap-4',
  // Sizing
  'w-full max-w-md',
  // Styling
  'bg-white border border-gray-200 rounded-lg shadow-sm',
  // Interactive
  'hover:shadow-md transition-shadow',
  // Conditional
  isActive && 'ring-2 ring-blue-500',
  className
)}>

// ❌ Bad - Random class order
<div className="hover:shadow-md bg-white w-full transition-shadow flex rounded-lg border max-w-md flex-col border-gray-200 gap-4 shadow-sm">
```

#### Custom CSS
```css
/* ✅ Good - BEM methodology */
.campaign-card {
  @apply bg-white border border-gray-200 rounded-lg;
}

.campaign-card__header {
  @apply p-4 border-b border-gray-100;
}

.campaign-card__header--featured {
  @apply bg-gradient-to-r from-purple-500 to-blue-500;
}

/* ❌ Bad - Unclear naming */
.card {
  @apply bg-white;
}

.card2 {
  @apply p-4;
}
```

## Testing Guidelines

### Unit Testing

#### Component Testing
```typescript
// ✅ Good component test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CampaignCard } from '../CampaignCard';
import { mockCampaign } from '../../test/mocks';

describe('CampaignCard', () => {
  it('displays campaign information correctly', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    
    expect(screen.getByText(mockCampaign.title)).toBeInTheDocument();
    expect(screen.getByText(mockCampaign.description)).toBeInTheDocument();
    expect(screen.getByText(`${mockCampaign.price} ETH`)).toBeInTheDocument();
  });

  it('calls onMint when mint button is clicked', async () => {
    const onMint = jest.fn();
    render(<CampaignCard campaign={mockCampaign} onMint={onMint} />);
    
    fireEvent.click(screen.getByText('Mint'));
    
    await waitFor(() => {
      expect(onMint).toHaveBeenCalledWith(mockCampaign.id);
    });
  });

  it('shows loading state during mint', async () => {
    const onMint = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<CampaignCard campaign={mockCampaign} onMint={onMint} />);
    
    fireEvent.click(screen.getByText('Mint'));
    
    expect(screen.getByText('Minting...')).toBeInTheDocument();
  });
});
```

#### Hook Testing
```typescript
// ✅ Good hook test
import { renderHook, waitFor } from '@testing-library/react';
import { useCampaign } from '../useCampaign';
import { mockApi } from '../../test/mocks';

jest.mock('../../api');

describe('useCampaign', () => {
  it('fetches campaign data successfully', async () => {
    mockApi.campaigns.get.mockResolvedValue(mockCampaign);
    
    const { result } = renderHook(() => useCampaign('campaign_123'));
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.campaign).toEqual(mockCampaign);
      expect(result.current.error).toBeNull();
    });
  });
});
```

### E2E Testing

#### Playwright Tests
```typescript
// ✅ Good E2E test
import { test, expect } from '@playwright/test';

test.describe('Campaign Creation', () => {
  test('creator can create a new campaign', async ({ page }) => {
    // Setup
    await page.goto('/dashboard');
    await page.click('[data-testid="connect-wallet"]');
    // ... wallet connection setup
    
    // Create campaign
    await page.click('[data-testid="create-campaign"]');
    await page.fill('[data-testid="campaign-title"]', 'Test Campaign');
    await page.fill('[data-testid="campaign-description"]', 'Test Description');
    await page.fill('[data-testid="campaign-price"]', '0.05');
    await page.fill('[data-testid="campaign-supply"]', '100');
    
    // Submit and verify
    await page.click('[data-testid="deploy-campaign"]');
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="campaign-card"]')).toContainText('Test Campaign');
  });
});
```

## Documentation Guidelines

### Code Documentation

#### Function Documentation
```typescript
/**
 * Calculates the ZoraCred reputation score for a creator
 * 
 * @param creator - Creator data including volume, supporters, etc.
 * @returns Reputation score between 0-1000
 * 
 * @example
 * ```typescript
 * const score = calculateZoraCred({
 *   totalVolume: 10.5,
 *   uniqueSupporters: 150,
 *   campaignCount: 5,
 *   successfulCampaigns: 4
 * });
 * console.log(score); // 725
 * ```
 */
export const calculateZoraCred = (creator: CreatorData): number => {
  // Implementation
};
```

#### Component Documentation
```typescript
/**
 * CampaignCard component displays campaign information and mint functionality
 * 
 * @param campaign - Campaign data to display
 * @param onMint - Callback when user clicks mint button
 * @param className - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <CampaignCard
 *   campaign={campaign}
 *   onMint={(id) => console.log('Minting:', id)}
 *   className="custom-styling"
 * />
 * ```
 */
export const CampaignCard: React.FC<CampaignCardProps> = ({...}) => {
  // Implementation
};
```

### README Guidelines

When contributing documentation:
- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Update table of contents
- Test all code snippets
- Consider different user skill levels

## Performance Guidelines

### Frontend Performance

#### Component Optimization
```typescript
// ✅ Good - Memoized expensive computations
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return expensiveDataProcessing(data);
  }, [data]);
  
  return <div>{processedData}</div>;
});

// ✅ Good - Lazy loading
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Explore = lazy(() => import('./pages/Explore'));
```

#### Bundle Optimization
```typescript
// ✅ Good - Dynamic imports
const loadAnalytics = async () => {
  const { analytics } = await import('./utils/analytics');
  return analytics;
};

// ✅ Good - Tree shaking friendly imports
import { formatCurrency } from './utils/format';
// ❌ Bad - Imports entire library
import * as utils from './utils';
```

### Backend Performance

#### Database Queries
```typescript
// ✅ Good - Optimized query with proper indexing
const getCampaignsByCreator = async (creatorId: string) => {
  return await db.campaign.findMany({
    where: { creatorId },
    include: {
      creator: {
        select: { name: true, avatar: true, zoracredScore: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

// ❌ Bad - N+1 query problem
const campaigns = await db.campaign.findMany();
for (const campaign of campaigns) {
  campaign.creator = await db.user.findUnique({ where: { id: campaign.creatorId } });
}
```

## Security Guidelines

### Frontend Security

#### Input Validation
```typescript
// ✅ Good - Proper validation
const validateCampaignData = (data: unknown): CampaignData => {
  const schema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().max(1000),
    price: z.string().regex(/^\d+(\.\d{1,18})?$/),
    maxSupply: z.number().min(1).max(1000000)
  });
  
  return schema.parse(data);
};

// ❌ Bad - No validation
const createCampaign = (data: any) => {
  // Direct usage without validation
};
```

#### XSS Prevention
```typescript
// ✅ Good - Sanitized content
import DOMPurify from 'dompurify';

const SafeHTML = ({ content }: { content: string }) => {
  const sanitized = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
};

// ❌ Bad - Raw HTML injection
const UnsafeHTML = ({ content }: { content: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};
```

### Backend Security

#### Authentication
```typescript
// ✅ Good - Proper JWT verification
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};
```

## Review Process

### Pull Request Reviews

When reviewing PRs, consider:

#### Code Quality
- [ ] Code follows established patterns
- [ ] Proper error handling
- [ ] Performance considerations
- [ ] Security implications
- [ ] Test coverage

#### Documentation
- [ ] Code is well-documented
- [ ] README updates if needed
- [ ] API documentation updates
- [ ] Breaking changes documented

#### Testing
- [ ] Adequate test coverage
- [ ] Tests actually test the functionality
- [ ] Edge cases considered
- [ ] E2E tests for new features

### Review Checklist

Before submitting a PR:
- [ ] All tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] No console.log statements
- [ ] Environment variables documented
- [ ] Performance impact considered
- [ ] Security implications reviewed
- [ ] Accessibility tested

## Release Process

### Version Management

We use [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

Before releasing:
- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Security review completed
- [ ] Performance benchmarks met
- [ ] Backward compatibility verified

## Getting Help

### Resources
- **Documentation**: Check existing docs first
- **GitHub Issues**: Search for existing issues
- **GitHub Discussions**: Ask questions and discuss ideas
- **Code Review**: Request help in PR reviews

### Contact
- **Technical Questions**: Create a GitHub Discussion
- **Bug Reports**: Open a GitHub Issue
- **Security Issues**: Email security@credvault.io
- **General Questions**: Join our Discord community

## Recognition

### Contributors
We recognize contributors through:
- **Contributors File**: Listed in CONTRIBUTORS.md
- **Release Notes**: Mentioned in release announcements  
- **Social Media**: Featured in our social media posts
- **Special Badges**: GitHub profile badges for significant contributions

### Types of Recognition
- **First-time Contributors**: Welcome and guidance
- **Regular Contributors**: Community recognition
- **Major Contributors**: Special acknowledgment
- **Maintainers**: Core team invitation

## License

By contributing to CredVault, you agree that your contributions will be licensed under the [MIT License](LICENSE.md).

---

Thank you for contributing to CredVault! Together, we're building the future of creator-supporter relationships in Web3. 🚀
