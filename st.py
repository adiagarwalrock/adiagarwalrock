def to_base_n(int_base_10, n):
    res = int(int_base_10)
    digits = []
    while res >= n:
        r = res % n
        digits.append(str(r))
        res = (res - r) // n
    digits.append(str(res))
    return ''.join(digits[::-1])


def to_base_10(int_base_n, n):
    x = list(int_base_n[::-1])
    y_base_10 = 0
    for i, a in enumerate(x):
        y_base_10 += int(a) * (n ** i)
    return str(y_base_10)


def answer(n, b):

    k = len(n)
    m = n
    nums = []
    while m not in nums:
        nums.append(m)
        s = sorted(m)
        x = ''.join(s[::-1])
        y = ''.join(s)
        if b == 10:
            int_m = int(x) - int(y)
            m = str(int_m)
        else:
            int_m_10 = int(to_base_10(x, b)) - int(to_base_10(y, b))
            m = to_base_n(str(int_m_10), b)

        m =  (k - len(m)) * '0' + m
    return len(nums) - nums.index(m)